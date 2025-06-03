import { BadgeTypeEnum } from '../../../components/ui';

export const TAG_MODAL = 'tagModal';

export const tagNameMap: { [key in BadgeTypeEnum]: string } = {
  [BadgeTypeEnum.lightBlue]: 'Light Blue',
  [BadgeTypeEnum.darkBrown]: 'Dark Brown',
  [BadgeTypeEnum.lightGreen]: 'Light Green',
  [BadgeTypeEnum.darkRed]: 'Dark Red',
  [BadgeTypeEnum.darkPurple]: 'Dark Purple',
  [BadgeTypeEnum.none]: 'None',
};
