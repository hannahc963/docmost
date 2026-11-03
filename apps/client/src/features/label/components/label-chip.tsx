import { Link } from "react-router-dom";
import { Popover, useComputedColorScheme } from "@mantine/core";
import { IconPalette, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { ILabel } from "@/features/label/types/label.types.ts";
import { getLabelColor } from "@/features/label/utils/label-colors.ts";
import classes from "@/features/label/label.module.css";
import type { LabelColorName } from "@/features/label/utils/label-colors.ts";
import { LabelColorPicker } from "@/features/label/components/label-color-picker.tsx";

type LabelChipProps = {
  label: Pick<ILabel, "id" | "name" | "color">;
  onRemove?: () => void;
  onChangeColor?: (color: LabelColorName) => void;
  asLink?: boolean;
};

export function LabelChip({
  label,
  onRemove,
  onChangeColor,
  asLink,
}: LabelChipProps) {
  const { t } = useTranslation();
  const scheme = useComputedColorScheme("light");
  const c = getLabelColor(label.name, scheme, label.color);

  const nameNode = asLink ? (
    <Link
      to={`/labels/${encodeURIComponent(label.name)}`}
      className={classes.chipLink}
      onClick={(e) => e.stopPropagation()}
    >
      <span className={classes.chipName}>{label.name}</span>
    </Link>
  ) : (
    <span className={classes.chipName}>{label.name}</span>
  );

  return (
    <span className={classes.chip} style={{ background: c.bg, color: c.fg }}>
      <span className={classes.chipDot} style={{ background: c.dot }} />
      {nameNode}
      {onChangeColor && (
        <Popover position="bottom-start" shadow="md" withinPortal>
          <Popover.Target>
            <button
              type="button"
              className={classes.chipColorButton}
              aria-label={t("Change color for {{name}}", {
                name: label.name,
              })}
              title={t("Change color")}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <IconPalette size={12} />
            </button>
          </Popover.Target>
          <Popover.Dropdown p="xs">
            <LabelColorPicker value={label.color} onChange={onChangeColor} />
          </Popover.Dropdown>
        </Popover>
      )}
      {onRemove && (
        <button
          type="button"
          className={classes.chipX}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          aria-label={t("Remove label {{name}}", { name: label.name })}
        >
          <IconX size={12} stroke={2} />
        </button>
      )}
    </span>
  );
}
