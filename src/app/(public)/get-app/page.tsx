import { PublicPageShell, SoftCard } from "@/components/layout/PublicPageShell";
import { Download, Smartphone, Share, Bell, WifiOff, Zap } from "lucide-react";

export const metadata = { title: "Get the app" };

export default function GetAppPage() {
  const features = [
    { icon: Zap, title: "Home-screen launch", text: "Open SKR like a real app — no browser chrome." },
    { icon: WifiOff, title: "Offline basics", text: "Key pages stay available when the network is weak." },
    { icon: Bell, title: "Quick shortcuts", text: "Jump to Login, Apply, Notices or Contact from the icon menu." },
    { icon: Smartphone, title: "Mobile-first portals", text: "Student, parent, teacher and staff dashboards optimised for phones." },
  ];

  return (
    <PublicPageShell
      eyebrow="Mobile app"
      title="Use SKR College as a mobile app"
      description="Install our Progressive Web App (PWA) on Android or iPhone. No Play Store or App Store download required — it installs from this website."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <SoftCard key={f.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff0f1] text-[#c8102e]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-[#1a1a1a]">{f.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{f.text}</p>
              </div>
            </SoftCard>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <SoftCard>
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#1a1a1a]">
            <Download className="h-5 w-5 text-[#c8102e]" /> Android / Chrome
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Open this site in Chrome.</li>
            <li>Tap the menu (⋮) → <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
            <li>Confirm. The SKR icon appears on your home screen.</li>
          </ol>
        </SoftCard>
        <SoftCard>
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#1a1a1a]">
            <Share className="h-5 w-5 text-[#c8102e]" /> iPhone / Safari
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Open this site in Safari.</li>
            <li>Tap the <strong>Share</strong> button.</li>
            <li>Choose <strong>Add to Home Screen</strong> → Add.</li>
          </ol>
        </SoftCard>
      </div>

      <SoftCard className="mt-6 bg-[#1a1a1a] text-white">
        <h2 className="text-lg font-bold">Already have a portal login?</h2>
        <p className="mt-2 text-sm text-white/70">
          After installing, open the app and go to Portal → sign in as student, parent, teacher or staff.
        </p>
        <a href="/login" className="mt-4 inline-flex rounded-full bg-[#c8102e] px-5 py-2.5 text-sm font-bold text-white">
          Open portal login
        </a>
      </SoftCard>
    </PublicPageShell>
  );
}
