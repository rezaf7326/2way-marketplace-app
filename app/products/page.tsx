'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Table, Flex, Callout, Button, DropdownMenu } from '@radix-ui/themes';
import Pagination from '@/app/components/Pagination';
import { PaginationMetadata } from '@/app/lib/interfaces';
import { FetchError, FetchRequestFactory } from '@/app/lib/fetch';
import ErrorCallout from '@/app/components/error/ErrorCallout';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Cookies from 'js-cookie';
import { useAuth } from '@/app/AuthProvider';
import Link from 'next/link';
import SignInRequired from '@/app/components/error/SignInRequired';
import { Product } from '../lib/interfaces/product.interface';

export default function DetailSetsTable() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [metadata, setMetadata] = useState<PaginationMetadata | undefined>();
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number>(0);

  const onDelete = (id: number) => {
    setDeletingId(id);
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path(`product/${id}`)
      .create()
      .delete({
        headers: { Authorization: Cookies.get('token') as string },
      })
      .then(() => window.location.reload())
      .catch()
      .finally(() => setDeletingId(0));
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('product')
      .query({ page, size })
      .create()
      .get<{
        products: Array<Product>;
        metadata: PaginationMetadata;
      }>({ headers: { Authorization: Cookies.get('token') as string } })
      .then(({ body }) => {
        setProducts(body!.products);
        setMetadata(body!.metadata);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [page, size]);

  const nextPage = () => {
    if (metadata && page < metadata.totalPages) {
      setPage(page + 1);
    }
  };
  const prevPage = () => page > 1 && setPage(page - 1);

  function loadingRows() {
    const rows: Array<ReactNode> = [];
    while (rows.length < size) {
      rows.push(
        <Table.Row key={rows.length + 1}>
          <Table.RowHeaderCell>
            <Skeleton />
          </Table.RowHeaderCell>
          <Table.Cell className="hidden lg:table-cell">
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
          <Table.Cell>
            <Skeleton />
          </Table.Cell>
        </Table.Row>,
      );
    }

    return rows;
  }

  if (error) {
    return user ? (
      <ErrorCallout
        message={error instanceof FetchError ? error.message : undefined}
      />
    ) : (
      <SignInRequired />
    );
  }

  return (
    <Flex direction="column" align="center" className="min-w-full">
      {!products.length && !loading && (
        <Callout.Root color="gray" className="min-w-full my-2">
          <Callout.Text>No products exist yet!</Callout.Text>
        </Callout.Root>
      )}
      <Table.Root className="min-w-full my-5" layout="auto" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden lg:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Seller</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity Available</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading
            ? loadingRows()
            : products.map((product) => (
                <Table.Row key={product.id}>
                  <Table.RowHeaderCell>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-700 hover:text-indigo-950 transition-colors"
                    >
                      {product.name}
                    </Link>
                  </Table.RowHeaderCell>
                  <Table.Cell className="hidden lg:table-cell">
                    {product.description}
                  </Table.Cell>
                  <Table.Cell align="right">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button
                          variant="ghost"
                          color="gray"
                          loading={deletingId === product.id}
                          disabled={deletingId === product.id}
                        >
                          Options
                          <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      {/* TODO dropdown content here */}
                    </DropdownMenu.Root>
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
      {metadata && (
        <Pagination
          metadata={metadata}
          setPage={setPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </Flex>
  );
}
