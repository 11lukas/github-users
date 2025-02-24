import NoListData from "@components/no-list-data/no-list-data";
import UserListItem from "@components/user-list-item/user-list-item";
import { useUsersSearch } from "@core/queries/users";
import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, Container, Fab, InputAdornment, Stack, TextField } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { jumpToTop } from "@utils/screen";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  search: yup.string().required(),
});

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [searchVal, setSearchVal] = useState<string>('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsersSearch(searchVal);

  const { register, watch } = useForm<SearchFormInputs>({ defaultValues: { search: '' }, resolver: yupResolver(schema) });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = watch(({ search = '' }) => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        jumpToTop()

        setSearchVal(search);
        if (hasNextPage) fetchNextPage();
      }, 2000);
    });

    return () => subscription.unsubscribe();
  }, [hasNextPage, watch, fetchNextPage]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // Stary dobry HOF - to jest to co miałem zaznaczyć, akurat nie w tym przypadku bo tu sprawę załatwia hookform i jest mały formularz, ale HOF można śmiało wykorzystać 
  // np. mamy formularz kilka pól, ale każde pole tak na prawdę woła tylko onChange. Robimy sobie HOF, przekazujemy w miejsce onChange czy tam handleChange onChange={handleChange} w formie handleChange('nazwaPola')
  // no i mamy załatwiony generyk pod wiele pól, różniących się tylko nazwami. Ale mamy masę libek, co robią to za nas :)
  const UsersList = () => useMemo(() => {
    if (!data) return null;

    if (!data.pages[0].items.length) {
      return <NoListData />
    }

    return data.pages.flatMap((page) =>
      page.items.map((user) => <UserListItem key={user.id} user={user} />))
  }, [data])

  return (
    <Container>
      <Stack position='sticky' top={0} zIndex={10} py={3} bgcolor='Background'>
        <TextField
          {...register("search")}
          variant="outlined"
          slotProps={{
            input: {
              placeholder: 'Szukaj...',
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            },
          }}
        />
      </Stack>
      <Stack gap={2}>
        <UsersList />
        {isFetchingNextPage ? <Box justifyContent='center'><CircularProgress size={64} /></Box> : null}
      </Stack>
      <Stack ref={observerRef} style={{ height: '60px' }} />
      {hasNextPage ? <Fab sx={{ position: 'fixed', bottom: 48, right: 48 }} color="primary" onClick={jumpToTop}><KeyboardArrowUpIcon /></Fab> : null}
    </Container>

  )
}
