type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps ) => {
  return(
    <div>
      <main>{children}</main>
    </div>
  );
};
