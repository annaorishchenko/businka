import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { DECOR } from "@/shared/assets/decor";
import { LayoutRoot, Main, SideDecor } from "./Layout.styled";

export const Layout = () => (
    <LayoutRoot>
        <Header />
        <Main>
            <SideDecor $side="left" aria-hidden="true">
                <img src={DECOR.pendant} alt="" />
            </SideDecor>
            <SideDecor $side="right" aria-hidden="true">
                <img src={DECOR.pendant} alt="" />
            </SideDecor>
            <Outlet />
        </Main>
        <Footer />
    </LayoutRoot>
);
