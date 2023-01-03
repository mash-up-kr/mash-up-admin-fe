import { RecoilValue, Snapshot, useRecoilCallback } from 'recoil';

const noWaitRegex = /__noWait/;
const selectorFamilyRegex = /__selectorFamily/;

const isAtom = (snapshot: Snapshot, target: RecoilValue<unknown>) => {
  const { type } = snapshot.getInfo_UNSTABLE(target);
  return type === 'atom';
};
const isNoWaitValue = ({ key }: RecoilValue<unknown>) => noWaitRegex.test(key);
const isSelectorFamily = ({ key }: RecoilValue<unknown>) => selectorFamilyRegex.test(key);

const useRefreshSelectorFamilyByKey = () =>
  useRecoilCallback(({ snapshot, refresh }) => (selectorKey) => {
    const nodes = Array.from(snapshot.getNodes_UNSTABLE());

    nodes.forEach((node) => {
      if (isAtom(snapshot, node) || isNoWaitValue(node) || !isSelectorFamily(node)) {
        return;
      }

      const nodeKey = node.key.split(selectorFamilyRegex)[0];

      if (selectorKey === nodeKey) {
        refresh(node);
      }
    });
  });

export default useRefreshSelectorFamilyByKey;
