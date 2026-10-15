import { getActiveBlogCategories } from "@/lib/data";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const blogCategories = await getActiveBlogCategories();
  return <NavbarClient blogCategories={blogCategories} />;
}
