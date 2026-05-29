import { Hero } from "@/widgets/Hero";
import { CatalogPreview } from "@/widgets/CatalogPreview";
import { Features } from "@/widgets/Features";
import { Popular } from "@/widgets/Popular";
import { MasterClass } from "@/widgets/MasterClass";

const HomePage = () => (
    <>
        <Hero />
        <CatalogPreview />
        <Popular />
        <Features />
        <MasterClass />
    </>
);

export default HomePage;
