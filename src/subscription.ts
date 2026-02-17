import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups, { OPEN_AD_ORDER } from './globalGroups';
import { RawApp, RawAppGroup } from '@gkd-kit/api';

const apps = await batchImportApps(`${import.meta.dirname}/apps`);
const rawApps: RawApp[] = [];
apps.forEach((appConfig) => {
  appConfig.groups?.forEach((g: RawAppGroup) => {
    if (g.name.startsWith('开屏广告')) {
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 52143,
  name: 'GKD规则 fork AIsouler',
  version: 0,
  author: 'AinaSnow',
  checkUpdateUrl: './AinaSnow.version.json5',
  supportUri: 'https://github.com/AinaSnow/GKD_subscription/issues/new/choose',
  categories,
  globalGroups,
  apps: rawApps,
});
