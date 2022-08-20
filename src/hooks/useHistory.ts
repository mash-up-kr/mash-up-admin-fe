import { useLocation, useNavigate } from 'react-router-dom';

type HistoryLocationFromState = { from: string } | undefined;

const useHistory = (clearQueryString = true) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location ?? {};
  const { from } = (location.state as HistoryLocationFromState) ?? {};

  const handleNavigate = (to: string) => {
    const currentPath = location.pathname;
    const currentPathWithQueryString = `${location.pathname}${search}`;
    const fromPath = clearQueryString ? currentPath : currentPathWithQueryString;

    navigate(to, {
      state: {
        from: fromPath,
      },
    });
  };

  const handleGoBack = (defaultPath?: string) => {
    if (from) {
      navigate(from);
      return;
    }

    if (defaultPath) {
      navigate(defaultPath);
      return;
    }

    navigate(-1);
  };

  return {
    handleNavigate,
    handleGoBack,
  };
};

export default useHistory;
