import ThemeLocalization from "./ThemeLocalization";
import ThemeRtlLayout from "./ThemeRtlLayout";
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeLocalization>
      <ThemeRtlLayout>{children}</ThemeRtlLayout>
    </ThemeLocalization>
  );
}
