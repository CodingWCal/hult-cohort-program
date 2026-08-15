export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-14 leading-relaxed">
      <h1 className="font-serif text-4xl">Privacy</h1>
      <p className="mt-4 text-[var(--muted)]">Last updated: 14 August 2026.</p>
      <p className="mt-6">
        LocalPlate is a student venture MVP. We collect the name, email, role,
        and neighborhood you type on Join, plus dishes and orders you submit.
      </p>
      <p className="mt-4">
        That data is stored so the live demo can show menus, reservations, and a
        public metrics snapshot. On hosted serverless it may live in a temporary
        store and can reset when instances recycle. Do not submit secrets,
        payment cards, or government IDs.
      </p>
      <p className="mt-4">
        Browser errors may be posted to <code>/api/errors</code> for monitoring.
        We do not sell personal data. To request deletion, email the operator
        listed on the submission PR and include the address you used to join.
      </p>
    </article>
  );
}
