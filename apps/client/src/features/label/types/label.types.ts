import { QueryParams } from "@/lib/types.ts";
import { LabelColorName } from "@/features/label/utils/label-colors.ts";

export type LabelType = "page" | "space";

export interface ILabel {
  id: string;
  name: string;
  color: LabelColorName | null;
  type: LabelType;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddLabels {
  pageId: string;
  names: string[];
  color?: LabelColorName;
}

export interface IUpdateLabelColor {
  pageId: string;
  labelId: string;
  color: LabelColorName;
}

export interface IRemoveLabel {
  pageId: string;
  labelId: string;
}

export interface IPageLabelsParams {
  pageId: string;
  cursor?: string;
  limit?: number;
}

export interface IListLabelsParams {
  type: LabelType;
  query?: string;
  cursor?: string;
  limit?: number;
}

export interface ILabelInfo {
  name: string;
  usageCount: number;
}

export interface ILabelPageItem {
  id: string;
  slugId: string;
  title: string | null;
  icon: string | null;
  spaceId: string;
  createdAt: string;
  updatedAt: string;
  space: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
  } | null;
  creator: { id: string; name: string; avatarUrl: string | null } | null;
  labels: { id: string; name: string; color: LabelColorName | null }[];
}

export interface IFindPagesByLabelParams extends QueryParams {
  labelId?: string;
  name?: string;
  spaceId?: string;
}

export interface ILabelInfoParams {
  name: string;
  type: LabelType;
  spaceId?: string;
}
