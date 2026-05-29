import styled from "styled-components";
import { ICONS, type IconName } from "@/shared/assets/icons";

type Props = {
    name: IconName;
    size?: number;
    label?: string;
    className?: string;
};

const Img = styled.img<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    object-fit: contain;
    flex-shrink: 0;
`;

export const Icon = ({ name, size = 20, label, className }: Props) => (
    <Img src={ICONS[name]} alt={label ?? name} $size={size} className={className} />
);
