/**
 * @see https://umijs.org/docs/max/access#access
 */
export default function access(
  _initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return {
    canAdmin: !!isLoggedIn,
  };
}
