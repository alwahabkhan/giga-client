import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Field, inputCls, PrimaryButton, SubScreen } from "@/components/app/ui";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/profile/edit")({
  head: () => seo("Edit Profile", "Update your Giga Group profile details."),
  component: EditProfile,
});

function EditProfile() {
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState(profile);
  return (
    <SubScreen title="Edit profile" back="/profile">
      <form
        className="mt-2 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (f.name.trim().length < 3 || !f.email.includes("@")) return toast.error("Enter a valid name and email");
          setProfile({ ...f, name: f.name.trim() });
          toast.success("Profile updated");
          navigate({ to: "/profile" });
        }}
      >
        <Field label="Full Name"><input className={inputCls} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Email Address"><input type="email" className={inputCls} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Phone Number"><input className={inputCls} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
        <p className="text-[11.5px] text-muted-foreground">CNIC and account reference can only be changed by Giga Group after re-verification.</p>
        <PrimaryButton type="submit">Save changes</PrimaryButton>
      </form>
    </SubScreen>
  );
}
