'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  MRT_EditActionButtons,
  MRT_PaginationState,
  type MRT_Row,
  MRT_SortingState,
  type MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Box, Button, Flex, Stack, Text, Title, Tooltip, } from '@mantine/core';
import { modals, ModalsProvider } from '@mantine/modals';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { Developer } from '@/app/shered/types/response/developers';
import { URI_PATH } from '@/app/shered/constants/path';
import useRequest from '@/app/hooks/useRequest';
import { MainResponse, Pagination } from '@/app/shered/types/response/dto';
import { GENDERS } from '@/app/shered/components/DevTable/constants';
import { MRT_Localization_PT_BR } from 'mantine-react-table/locales/pt-BR/index.esm.mjs';
import moment from "moment";
import useDeveloperValidation from "@/app/hooks/useDeveloperValidation";
import toast from "react-hot-toast";

export default function DevTable() {
  const { show, list, create, update, destroy } = useRequest();
  const queryClient = useQueryClient();
  const { validateDeveloper, validationErrors, setValidationErrors } = useDeveloperValidation();
  const [ rowCount, setRowCount ] = useState<number>()
  const {
    data: fetchedDevelopers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useListDevelopers();
  const { mutateAsync: createDeveloper, isPending: isCreatingDeveloper } = useCreateDeveloper();
  const { mutateAsync: deleteDeveloper, isPending: isDeletingDeveloper } = useDeleteDeveloper();
  const { mutateAsync: updateDeveloper, isPending: isUpdatingDeveloper } = useUpdateDeveloper();
  const { mutateAsync: showDeveloper } = useShowDeveloper();
  const [ pagination, setPagination ] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [ globalFilter, setGlobalFilter ] = useState('');
  const [ sorting, setSorting ] = useState<MRT_SortingState>([]);

  const columns = useMemo<MRT_ColumnDef<Developer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'firstName',
        header: 'Nome',
        mantineEditTextInputProps: {
          type: 'text',
          required: true,
          maxLength: 50,
          error: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
        },
      },
      {
        accessorKey: 'lastName',
        header: 'Sobrenome',
        mantineEditTextInputProps: {
          type: 'text',
          required: true,
          maxLength: 50,
          error: validationErrors?.lastName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        mantineEditTextInputProps: {
          type: 'email',
          required: true,
          maxLength: 60,
          error: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'age',
        header: 'Idade',
        mantineEditTextInputProps: {
          type: 'text',
          required: true,
          maxLength: 3,
          error: validationErrors?.age,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              age: undefined,
            }),
        },
      },
      {
        id: 'birthDate',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
        enableColumnFilterModes: false,
        header: 'Data de Nascimento',
        accessorFn: (row) => {
          return moment(row.birthDate).format('YYYY-MM-DD');
        },
        Cell: ({ cell }) => {
          const date = moment(cell.getValue<string>(), 'YYYY-MM-DD');
          return date.format('DD/MM/YYYY');
        },
        mantineEditTextInputProps: (cell) => ({
          type: 'date',
          required: true,
          maxLength: 10,
          value: cell.row.original.birthDate ? moment(cell.row.original.birthDate).format('YYYY-MM-DD') : '',
          error: validationErrors?.birthDate,
          onChange: (e) => {
            const input = e.target as HTMLInputElement;
            const date = moment(input.value, 'YYYY-MM-DD');
            cell.row.original.birthDate = date.format('YYYY-MM-DD');
          },
          onFocus: () => {
            setValidationErrors({
              ...validationErrors,
              birthDate: undefined,
            });
          },
        }),
      },
      {
        accessorKey: 'gender',
        header: 'Gênero',
        editVariant: 'select',
        mantineEditSelectProps: {
          data: GENDERS,
          maxLength: 30,
        },
        Cell: ({ cell }) => {
          const gender = cell.getValue<string>();
          const genderLabel = GENDERS.find(g => g.value === gender)?.label || 'Não especificado';
          return <span>{genderLabel}</span>;
        },
      },
      {
        accessorKey: 'hobby',
        header: 'Hobby',
        mantineEditTextInputProps: {
          type: 'text',
          required: true,
          maxLength: 100,
          error: validationErrors?.hobby,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              hobby: undefined,
            }),
        },
      },
    ],
    [ setValidationErrors, validationErrors ],
  );

  useEffect(() => {
    refetchUsers().then();
  }, [ pagination.pageIndex, pagination.pageSize, refetchUsers, globalFilter, sorting, ]);

  function useShowDeveloper() {
    return useMutation({
      mutationFn: async (devId: string) => {
        return show<MainResponse<Developer>>(URI_PATH.MAIN.DEVELOPERS, devId).then(response => response.data.model);
      },
    });
  }

  function useListDevelopers() {
    return useQuery<Developer[]>({
      queryKey: [ 'developers' ],
      queryFn: async () => {
        const response = await list<MainResponse<Pagination<Developer>>>(URI_PATH.MAIN.DEVELOPERS, {
          params: {
            page: pagination.pageIndex + 1,
            perPage: pagination.pageSize,
            searchTerm: globalFilter,
            sorting: JSON.stringify(sorting ?? []),
          },
        });
        setRowCount(response.data.model.total);
        return (response.data.model.data);
      },
      refetchOnWindowFocus: false,
    });
  }

  function useCreateDeveloper() {
    return useMutation({
      mutationFn: async (dev: Developer) => {
        const req = create<Developer>(URI_PATH.MAIN.DEVELOPERS, dev).then(response => response.data);

        await toast.promise(
          req,
          {
            loading: 'Criando desenvolvedor..',
            success: 'Desenvolvedor cadastrado com sucesso!',
            error: (err) => `Error: ${err.toString()}`,
          },
        );
        return req;
      },
      onMutate: (newDevInfo: Developer) => {
        queryClient.setQueryData(
          [ 'developers' ],
          (prevDevelopers: Developer[] | undefined) => [
            ...(prevDevelopers || []),
            {
              ...newDevInfo,
            },
          ]
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [ 'developers' ] }),
    });
  }

  function useUpdateDeveloper() {
    return useMutation({
      mutationFn: async (dev: Developer) => {
        const req = update<Developer>(URI_PATH.MAIN.DEVELOPERS, dev.id, dev).then(response => response.data);

        await toast.promise(
          req,
          {
            loading: 'Atualizando desenvolvedor..',
            success: 'Desenvolvedor atualizado com sucesso!',
            error: (err) => `Error: ${err.toString()}`,
          }
        );

        return req;
      },
      onMutate: (newDevInfo: Developer) => {
        queryClient.setQueryData(
          [ 'developers' ],
          (prevDevelopers: any) =>
            prevDevelopers?.map((prevDev: Developer) =>
              prevDev.id === newDevInfo.id ? newDevInfo : prevDev
            )
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [ 'developers' ] }),
    });
  }

  function useDeleteDeveloper() {
    return useMutation({
      mutationFn: async (devId: string) => {
        const req = destroy(URI_PATH.MAIN.DEVELOPERS, devId).then(response => response.data);

        await toast.promise(
          req,
          {
            loading: 'Deletando desenvolvedor..',
            success: 'Desenvolvedor deletado com sucesso!',
            error: (err) => `Error: ${err.toString()}`,
          }
        );

        return req;
      },
      onMutate: (devId: string) => {
        queryClient.setQueryData(
          [ 'developers' ],
          (prevDevelopers: any) =>
            prevDevelopers?.filter((dev: Developer) => dev.id !== devId)
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [ 'developers' ] }),
    });
  }

  const handleCreateDeveloper: MRT_TableOptions<Developer>['onCreatingRowSave'] =
    async (
      {
        values,
        exitCreatingMode,
      }) => {
      const newValidationErrors = validateDeveloper(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createDeveloper(values);
      exitCreatingMode();
    };

  const handleSaveDeveloper: MRT_TableOptions<Developer>['onEditingRowSave'] =
    async ({
             values,
             table,
           }) => {
      const newValidationErrors = validateDeveloper(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateDeveloper(values);
      table.setEditingRow(null);
    };

  const openShowModal = (developer: Developer) => {
    const fields = [
      { label: 'Id', value: developer.id },
      { label: 'Nome', value: `${developer.firstName} ${developer.lastName}` },
      { label: 'Email', value: developer.email },
      { label: 'Idade', value: developer.age },
      { label: 'Data de Nascimento', value: moment(developer.birthDate).format('DD/MM/YYYY') },
      { label: 'Gênero', value: GENDERS.find(g => g.value === developer.gender)?.label || 'Não especificado' },
      { label: 'Hobby', value: developer.hobby }
    ];

    modals.open({
      title: <Text size="lg" fw={600}>Detalhes do Desenvolvedor</Text>,
      children: (
        <Stack gap="md" mt="md">
          {fields.map((field) => (
            <Box key={field.label}>
              <Text fw={500}>
                {field.label}:
              </Text>
              <Text>{field.value}</Text>
            </Box>
          ))}
        </Stack>
      ),
    });
  };

  const openDeleteConfirmModal = (row: MRT_Row<Developer>) =>
    modals.openConfirmModal({
      title: (
        <Text size='lg' fw={500}>
          Excluir Registro
        </Text>
      ),
      children: (
        <Text>
          Você tem certeza que deseja excluir {row.original.firstName} {row.original.lastName}?
          Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: 'Excluir', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteDeveloper(row.original.id),
    });

  const table = useMantineReactTable({
    columns,
    getRowId: (row) => row.id,
    data: fetchedDevelopers,
    rowCount: rowCount,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    manualPagination: true,
    manualSorting: true,
    localization: { ...MRT_Localization_PT_BR },
    mantineSearchTextInputProps: {
      placeholder: 'Pesquisar',
    },
    mantinePaperProps: {
      shadow: 'none',
    },
    mantineTableContainerProps: {
      style: {
        maxHeight: 'calc(100vh - 242px)',
        minHeight: 'calc(100vh - 242px)',
      },
    },
    mantineToolbarAlertBannerProps: isLoadingUsersError
      ? {
        color: 'red',
        children: 'Error loading data',
      }
      : undefined,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDeveloper,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDeveloper,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Cadastrar Desenvolvedor</Title>
        {internalEditComponents}
        <Flex justify='flex-end' mt='xl'>
          <MRT_EditActionButtons variant='text' table={table} row={row}/>
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Editar Desenvolvedor</Title>
        {internalEditComponents}
        <Flex justify='flex-end' mt='xl'>
          <MRT_EditActionButtons variant='text' table={table} row={row}/>
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap='md'>
        <Tooltip label='Visualizar'>
          <ActionIcon
            variant='subtle'
            onClick={async () => await showDeveloper(row.original.id).then((dev) => openShowModal(dev))}>
            <IconEye/>
          </ActionIcon>
        </Tooltip>
        <Tooltip label='Editar'>
          <ActionIcon variant='subtle' onClick={() => table.setEditingRow(row)}>
            <IconEdit/>
          </ActionIcon>
        </Tooltip>
        <Tooltip label='Excluir'>
          <ActionIcon variant='subtle' color='red' onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash/>
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true);
        }}>
        Adicionar Desenvolvedor
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingDeveloper || isUpdatingDeveloper || isDeletingDeveloper,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
      density: 'xs',
      globalFilter,
      sorting,
      pagination,
    },
  });

  return (
    <ModalsProvider>
      <MantineReactTable table={table}/>
    </ModalsProvider>
  );
};
