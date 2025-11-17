import { BadgeVariant } from '../../components/ui/Badge/BadgeVariants';

export type TagResponse = {
  data: TagType[];
};

export type TagType = {
  gid: string;
  name: string;
  color: BadgeVariant;
};

export type CreateTagMutation = {
  name: string;
  color: string;
  workspaceGid: string;
};
