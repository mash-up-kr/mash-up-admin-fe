import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { Button, Table } from '@/components';
import { TableColumn } from '@/components/common/Table/Table.component';
import { AdminMemberResponse } from '@/types';
import { ButtonShape, ButtonSize } from '@/components/common/Button/Button.component';
import { request, uniqArray } from '@/utils';
import * as api from '@/api';
import { useToast } from '@/hooks';
import { ToastType } from '@/styles';
import { $modalByStorage, ModalKey } from '@/store';

const AdminMemberList = () => {
  const handleHelperMemberModal = useSetRecoilState(
    $modalByStorage(ModalKey.createHelperAdminMemberDialog),
  );

  const [adminMembers, setAdminMembers] = useState<AdminMemberResponse[]>([]);
  const [selectedRows, setSelectedRows] = useState<AdminMemberResponse[]>([]);
  const selectedResults = useMemo(
    () => uniqArray(selectedRows.map((row) => row.adminMemberId)) as number[],
    [selectedRows],
  );
  const { handleAddToast } = useToast();

  const getAdminMembers = async () => {
    const { data } = await api.getAdminMembers();
    setAdminMembers(data);
  };

  useEffect(() => {
    getAdminMembers();
  }, []);

  const tableRows = useMemo(() => (adminMembers as AdminMemberResponse[]) ?? [], [adminMembers]);
  const totalCount = adminMembers?.length;

  const columns: TableColumn<AdminMemberResponse>[] = [
    {
      title: '이름',
      widthRatio: '50%',
      accessor: 'username',
    },
    {
      title: '포지션',
      widthRatio: '50%',
      accessor: 'position',
    },
  ];

  const handleSelectAll = useCallback(
    async (checkedValue) => {
      if (checkedValue) {
        setSelectedRows([]);
        return;
      }
      setSelectedRows(tableRows);
    },
    [tableRows],
  );

  const handleResetPassword = useRecoilCallback(() => () => {
    request({
      requestFunc: async () => {
        await api.resetAdminMembersPassword(selectedResults);
      },
      onSuccess: () => {
        handleAddToast({
          type: ToastType.success,
          message: '성공적으로 비밀번호가 리셋되었습니다.',
        });
        setSelectedRows([]);
        getAdminMembers();
      },
      errorHandler: handleAddToast,
    });
  });

  const handleRemove = useRecoilCallback(() => () => {
    request({
      requestFunc: async () => {
        await api.deleteAdminMembers(selectedResults);
      },
      onSuccess: () => {
        handleAddToast({
          type: ToastType.success,
          message: '성공적으로 삭제되었습니다.',
        });
        setSelectedRows([]);
        getAdminMembers();
      },
      errorHandler: handleAddToast,
    });
  });

  return (
    <Table<AdminMemberResponse>
      prefix="admin-members"
      topStickyHeight={0}
      columns={columns}
      rows={tableRows}
      supportBar={{
        totalSummaryText: '총 인원',
        selectedSummaryText: '명 선택',
        totalCount,
        buttons: [
          <Button
            $size={ButtonSize.xs}
            shape={ButtonShape.defaultLine}
            onClick={() =>
              handleHelperMemberModal({
                key: ModalKey.createHelperAdminMemberDialog,
                props: { refreshList: getAdminMembers },
                isOpen: true,
              })
            }
          >
            헬퍼 추가
          </Button>,
          <Button
            $size={ButtonSize.xs}
            shape={ButtonShape.defaultLine}
            onClick={handleResetPassword}
            disabled={selectedResults.length === 0}
          >
            비밀번호 초기화
          </Button>,
          <Button
            $size={ButtonSize.xs}
            shape={ButtonShape.defaultLine}
            onClick={handleRemove}
            disabled={selectedResults.length === 0}
          >
            삭제
          </Button>,
        ],
      }}
      selectableRow={{
        selectedCount: selectedRows.length,
        selectedRows,
        setSelectedRows,
        handleSelectAll,
      }}
    />
  );
};

export default AdminMemberList;
