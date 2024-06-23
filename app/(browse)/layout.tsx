import { Suspense } from "react";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar, SiderbarSkeleton } from "./_components/siderbar";

const Browse = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />

      <div className="flex h-full pt-20">
        <Suspense fallback={<SiderbarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default Browse;
