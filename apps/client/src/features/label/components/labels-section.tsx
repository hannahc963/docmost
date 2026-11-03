import { useState } from "react";
import clsx from "clsx";
import { Divider, Popover, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { LabelChip } from "@/features/label/components/label-chip.tsx";
import { LabelPicker } from "@/features/label/components/label-picker.tsx";
import {
  useAddLabelsMutation,
  usePageLabelsQuery,
  useRemoveLabelMutation,
  useUpdateLabelColorMutation,
} from "@/features/label/queries/label-query.ts";
import type { LabelColorName } from "@/features/label/utils/label-colors.ts";
import classes from "@/features/label/label.module.css";

type LabelsSectionProps = {
  pageId: string;
  canEdit: boolean;
};

export function LabelsSection({ pageId, canEdit }: LabelsSectionProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { data } = usePageLabelsQuery(pageId);
  const addMutation = useAddLabelsMutation(pageId);
  const removeMutation = useRemoveLabelMutation(pageId);
  const updateColorMutation = useUpdateLabelColorMutation(pageId);

  const labels = data?.items ?? [];

  if (!canEdit && labels.length === 0) {
    return null;
  }

  const handleAdd = (name: string, color?: LabelColorName) => {
    addMutation.mutate({ pageId, names: [name], color });
  };

  const handleColorChange = (labelId: string, color: LabelColorName) => {
    updateColorMutation.mutate({ pageId, labelId, color });
  };

  const handleRemove = (labelId: string) => {
    removeMutation.mutate({ pageId, labelId });
  };

  return (
    <>
      <Divider />
      <Stack gap="xs">
        <Text size="xs" fw={500} c="dimmed">
          {t("Labels")}
        </Text>
        <div className={classes.labelsWrap}>
          {labels.map((label) => (
            <LabelChip
              key={label.id}
              label={label}
              asLink
              onChangeColor={
                canEdit
                  ? (color) => handleColorChange(label.id, color)
                  : undefined
              }
              onRemove={canEdit ? () => handleRemove(label.id) : undefined}
            />
          ))}
          {canEdit && (
            <Popover
              opened={open}
              onChange={setOpen}
              position="bottom-end"
              shadow="lg"
              withinPortal
              offset={6}
            >
              <Popover.Target>
                <button
                  type="button"
                  className={clsx(classes.addBtn, open && classes.addBtnOpen)}
                  onClick={() => setOpen((v) => !v)}
                >
                  <IconPlus size={12} stroke={2} />
                  <span>
                    {labels.length === 0 ? t("Add label") : t("Add")}
                  </span>
                </button>
              </Popover.Target>
              <Popover.Dropdown p={0} className={classes.popover}>
                <LabelPicker
                  applied={labels}
                  enabled={open}
                  onAdd={handleAdd}
                  onClose={() => setOpen(false)}
                />
              </Popover.Dropdown>
            </Popover>
          )}
        </div>
      </Stack>
    </>
  );
}
