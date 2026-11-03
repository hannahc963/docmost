import { useTranslation } from "react-i18next";
import { useComputedColorScheme } from "@mantine/core";
import {
  getLabelColor,
  LABEL_COLOR_NAMES,
} from "@/features/label/utils/label-colors.ts";
import type { LabelColorName } from "@/features/label/utils/label-colors.ts";
import classes from "@/features/label/label.module.css";

type LabelColorPickerProps = {
  value: LabelColorName | null;
  onChange: (color: LabelColorName) => void;
};

export function LabelColorPicker({ value, onChange }: LabelColorPickerProps) {
  const { t } = useTranslation();
  const scheme = useComputedColorScheme("light");

  return (
    <div
      className={classes.colorPicker}
      role="group"
      aria-label={t("Label color")}
    >
      {LABEL_COLOR_NAMES.map((colorName) => (
        <button
          key={colorName}
          type="button"
          className={classes.colorOption}
          style={{ background: getLabelColor("", scheme, colorName).dot }}
          aria-label={t("Set color to {{color}}", { color: colorName })}
          aria-pressed={value === colorName}
          title={t("Set color to {{color}}", { color: colorName })}
          onClick={() => onChange(colorName)}
        />
      ))}
    </div>
  );
}
