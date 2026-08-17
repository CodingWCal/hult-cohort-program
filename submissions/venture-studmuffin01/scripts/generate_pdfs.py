"""Generate simple investor PDFs without external deps. Run: python generate_pdfs.py"""
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"


def escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def page_stream(lines: list[str], start_y: int = 750, font_size: int = 12, leading: int = 16) -> str:
    parts = ["BT", f"/F1 {font_size} Tf", "50 750 Td"]
    # Use Tm positioning per line for reliability
    cmds = ["BT", f"/F1 {font_size} Tf"]
    y = start_y
    for line in lines:
        cmds.append(f"1 0 0 1 50 {y} Tm ({escape(line)}) Tj")
        y -= leading
        if y < 50:
            break
    cmds.append("ET")
    return "\n".join(cmds)


def build_pdf(pages: list[list[str]]) -> bytes:
    objs: list[bytes] = []
    # 1 catalog, 2 pages tree, then per page: page obj + content obj, then font
    # We'll assemble with xref at end.

    font_obj_num = None
    content_objs = []
    page_objs = []

    # Object numbers: 1=Catalog, 2=Pages, 3=Font, then pairs for each page
    # Actually: 1 Catalog, 2 Pages, 3 Font, then for i, page=4+2i, content=5+2i

    def add_obj(data: str) -> int:
        objs.append(data.encode("latin-1", errors="replace"))
        return len(objs)

    add_obj("")  # placeholder index 0 unused; we'll use 1-based list differently
    objs = []

    font_num = 3
    n = len(pages)
    page_nums = [4 + 2 * i for i in range(n)]
    content_nums = [5 + 2 * i for i in range(n)]

    catalog = f"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
    kids = " ".join(f"{p} 0 R" for p in page_nums)
    pages_obj = f"2 0 obj\n<< /Type /Pages /Kids [{kids}] /Count {n} >>\nendobj\n"
    font = "3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"

    body_parts = [catalog, pages_obj, font]

    for i, lines in enumerate(pages):
        stream = page_stream(lines)
        stream_bytes = stream.encode("latin-1", errors="replace")
        content = (
            f"{content_nums[i]} 0 obj\n"
            f"<< /Length {len(stream_bytes)} >>\n"
            f"stream\n"
        ).encode("latin-1") + stream_bytes + b"\nendstream\nendobj\n"
        page = (
            f"{page_nums[i]} 0 obj\n"
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
            f"/Contents {content_nums[i]} 0 R /Resources << /Font << /F1 3 0 R >> >> >>\n"
            f"endobj\n"
        )
        body_parts.append(page)
        body_parts.append(content.decode("latin-1"))

    # Rebuild properly as bytes with xref
    out = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    # objects 1..end in order: catalog, pages, font, then page/content pairs interleaved
    ordered: list[bytes] = [
        b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
        f"2 0 obj\n<< /Type /Pages /Kids [{kids}] /Count {n} >>\nendobj\n".encode(),
        b"3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    ]
    for i, lines in enumerate(pages):
        stream = page_stream(lines).encode("latin-1", errors="replace")
        ordered.append(
            (
                f"{page_nums[i]} 0 obj\n"
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
                f"/Contents {content_nums[i]} 0 R /Resources << /Font << /F1 3 0 R >> >> >>\n"
                f"endobj\n"
            ).encode()
        )
        ordered.append(
            f"{content_nums[i]} 0 obj\n<< /Length {len(stream)} >>\nstream\n".encode()
            + stream
            + b"\nendstream\nendobj\n"
        )

    for obj in ordered:
        offsets.append(len(out))
        out.extend(obj)

    xref_pos = len(out)
    out.extend(f"xref\n0 {len(offsets)}\n".encode())
    out.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        out.extend(f"{off:010d} 00000 n \n".encode())
    out.extend(
        f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n".encode()
    )
    return bytes(out)


def main() -> None:
    one_pager = [
        [
            "AI Prompting Academy — One-pager",
            "",
            "MVP workplace AI LMS for prompt craft (Copilot + assistants).",
            "Rawle Arneaud (@Studmuffin01) · Hult Cohort Program",
            "",
            "PROBLEM",
            "Copilot is rolled out; drafts stay mushy, invented, or unusable upstairs.",
            "Tip threads and long MOOCs do not create an on-the-job habit.",
            "",
            "PRODUCT",
            "- SCORE curriculum (Prompt Like a Pro) in an Academy LMS shell",
            "- Modules, quizzes, baseline to retest, progress tracking",
            "- Individuals + team seats (/pricing)",
            "",
            "WHY NOW",
            "GenAI is mandated at work; skill gap is method, not model access.",
            "",
            "PRICING (pilot hypothesis)",
            "Individual: $29 one-time / $9 mo | Team: $199 / 10 seats",
            "",
            "TRACTION",
            "- Live: https://prompt-like-a-pro-red.vercel.app",
            "- Customer discovery: 35 survey responses (13-15 Aug 2026)",
            "- 11 pilot leads (asked to be contacted)",
            "- Product users: venture metrics in submission PR (survey != users)",
            "",
            "ASK",
            "20 minutes for deck/pricing feedback, or intro to an L&D buyer.",
        ]
    ]

    deck_pages = [
        ["AI Prompting Academy", "", "Workplace AI learning for prompt craft", "", "Rawle Arneaud · @Studmuffin01", "https://prompt-like-a-pro-red.vercel.app"],
        ["Problem", "", "Professionals have Copilot. Prompts still fail.", "- Vague asks -> mushy drafts", "- Invented certainty -> unsafe to send", "- Rewrites erase the time AI should save"],
        ["Insight", "", "The skill gap is METHOD, not model access.", "Teams need a short, repeatable way to ask."],
        ["Solution", "", "AI Prompting Academy — MVP workplace AI LMS.", "First course: SCORE (Prompt Like a Pro)."],
        ["Product", "", "- ~60 min SCORE curriculum", "- Modules, quizzes, baseline -> retest", "- Individual + team access at /pricing"],
        ["Demo", "", "https://prompt-like-a-pro-red.vercel.app", "Apply SCORE to a real email or status update."],
        ["Customer discovery", "", "35 survey responses (13-15 Aug 2026)", "- Pain: generic output, rewrite, trust, prompts", "- WTP: mostly free / under TT$150; minority TT$150-300", "- 11 asked to be contacted (pilot leads)", "", "Insight: gap is prompt effectiveness, not AI access."],
        ["Business model", "", "Individual: $29 / $9 mo (hypothesis)", "Team: $199 / 10 seats (hypothesis)", "Enterprise: custom (roadmap)"],
        ["Traction", "", "- Production app live", "- Survey discovery packet in repo", "- Venture user metrics: see PR snapshot"],
        ["The ask", "", "20 minutes for feedback or an intro", "to an L&D / workplace-AI training buyer."],
        ["Close", "", "Prompt craft for Copilot that managers can forward.", "", "https://prompt-like-a-pro-red.vercel.app", "Rawle Arneaud · @Studmuffin01"],
    ]

    DOCS.mkdir(parents=True, exist_ok=True)
    (DOCS / "one-pager.pdf").write_bytes(build_pdf(one_pager))
    (DOCS / "pitch-deck.pdf").write_bytes(build_pdf(deck_pages))
    print("Wrote", DOCS / "one-pager.pdf")
    print("Wrote", DOCS / "pitch-deck.pdf")


if __name__ == "__main__":
    main()
