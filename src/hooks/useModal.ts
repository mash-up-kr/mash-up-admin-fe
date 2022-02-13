import { useRecoilState } from 'recoil';
import { $modalState, Modal, ModalKeyType } from '@/recoil/modal';

interface UseModal {
  handleAddModal: ({ key, props }: Modal) => void;
  handleRemoveCurrentModal: (key: ModalKeyType) => void;
}

export default function useModal(): UseModal {
  const [modalList, setModalList] = useRecoilState($modalState);

  const handleAddModal = ({ key, props }: Modal) => {
    setModalList([...modalList, { key, props }]);
  };

  const handleRemoveCurrentModal = (key: ModalKeyType) => {
    setModalList(modalList.filter(({ key: currentKey }) => currentKey !== key));
  };

  return {
    handleAddModal,
    handleRemoveCurrentModal,
  };
}
