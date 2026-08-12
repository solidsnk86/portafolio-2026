interface SeparatorProps {
    width: string | number;
    height: string | number;
}

export const Separator = ({ width = "100%", height = "48px" }: Partial<SeparatorProps>) => {
    return <div className="block bg-stripes border-b border-border-color" style={{ width, height }} />
}