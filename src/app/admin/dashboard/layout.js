import AdminNavigateLink from "@/page/admin/AdminNavigationLink/AdminNavigateLink";
const layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-black h-[100%]">
      {/* navigation links */}
      <div className="md:w-[30%] lg:w-[20%]">
        <AdminNavigateLink />
      </div>
      <div className="md:w-[70%] lg:w-[80%] pl-2 md:pl-0">
        {children}
      </div>
    </div>
  );
};

export default layout;
