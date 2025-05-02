import PlanWrapper from "@/components/dashboard/PlanWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PlanWrapper>
      {children}
    </PlanWrapper>
  );
}
