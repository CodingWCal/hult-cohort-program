export function visualFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("double")) return "doubles";
  if (t.includes("shark") || t.includes("bake")) return "bake";
  if (t.includes("roti") || t.includes("dhalpuri") || t.includes("buss")) return "roti";
  if (t.includes("pelau")) return "pelau";
  if (t.includes("crab")) return "crab";
  if (t.includes("aloo") || t.includes("pholourie")) return "aloo";
  if (t.includes("duck")) return "duck";
  if (t.includes("oil down") || t.includes("oildown")) return "oil";
  if (t.includes("sunday") || t.includes("callaloo") || t.includes("macaroni")) return "sunday";
  if (t.includes("corn soup") || t.includes("fete")) return "soup";
  if (t.includes("choka") || t.includes("sada")) return "choka";
  if (t.includes("sweet bread") || t.includes("sweetbread")) return "bread";
  return "kraft";
}

export function whatsappShareUrl(input: {
  cookName: string;
  title: string;
  neighborhood: string;
  pickupWindow: string;
  href: string;
}): string {
  const text = `${input.cookName} have ${input.title} in ${input.neighborhood} till ${input.pickupWindow}. Reserve here: ${input.href}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
