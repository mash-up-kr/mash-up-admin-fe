import { useLocation, useNavigate } from 'react-router-dom';

type HistoryLocationFromState = { from: string } | undefined;

const useHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as HistoryLocationFromState) ?? {};

  const handleNavigate = (to: string) => {
    navigate(to, {
      state: {
        from: location.pathname,
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
