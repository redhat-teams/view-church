import { useCallback, useEffect, useState } from "react";
import { normalizeList } from "../api/adminApi";

/**
 * Hook générique pour gérer une ressource admin (liste paginée + CRUD).
 *
 * @param {Object} options
 * @param {Function} options.list   - (params) => Promise(axios response)
 * @param {Function} [options.create]
 * @param {Function} [options.update]
 * @param {Function} [options.remove]
 * @param {Object}   [options.initialParams] - ex: { page: 1, search: "" }
 * @param {number}   [options.pageSize=10]
 */
export default function useAdminResource({
  list,
  create,
  update,
  remove,
  initialParams = {},
  pageSize = 10,
}) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(initialParams.page || 1);
  const [search, setSearch] = useState(initialParams.search || "");
  const [extraParams, setExtraParams] = useState(initialParams.extra || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        page_size: pageSize,
        ...(search ? { search } : {}),
        ...extraParams,
      };
      const { data } = await list(params);
      const { items: parsed, count: total } = normalizeList(data);
      setItems(parsed);
      setCount(total);
    } catch (err) {
      setError(err);
      setItems([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [list, page, search, JSON.stringify(extraParams), pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = () => fetchData();

  const createItem = async (payload) => {
    if (!create) return;
    setActionLoading(true);
    try {
      const res = await create(payload);
      await fetchData();
      return res;
    } finally {
      setActionLoading(false);
    }
  };

  const updateItem = async (id, payload) => {
    if (!update) return;
    setActionLoading(true);
    try {
      const res = await update(id, payload);
      await fetchData();
      return res;
    } finally {
      setActionLoading(false);
    }
  };

  const removeItem = async (id) => {
    if (!remove) return;
    setActionLoading(true);
    try {
      const res = await remove(id);
      // Si on supprime le dernier élément de la page, revenir en arrière
      if (items.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchData();
      }
      return res;
    } finally {
      setActionLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return {
    items,
    count,
    page,
    setPage,
    totalPages,
    search,
    setSearch: (val) => {
      setSearch(val);
      setPage(1);
    },
    extraParams,
    setExtraParams: (val) => {
      setExtraParams(val);
      setPage(1);
    },
    loading,
    error,
    actionLoading,
    refresh,
    createItem,
    updateItem,
    removeItem,
  };
}
