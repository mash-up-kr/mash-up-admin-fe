import { useLocation, useNavigate } from 'react-router-dom';

type HistoryLocationFromState = { from: string } | undefined;

const useHistory = (shouldClearQueryString = true) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location ?? {};
  const { from } = (location.state as HistoryLocationFromState) ?? {};

  const handleNavigate = (to: string) => {
    const currentPath = location.pathname;
    const currentPathWithQueryString = `${currentPath}${search}`;
    const fromPath = shouldClearQueryString ? currentPath : currentPathWithQueryString;

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
