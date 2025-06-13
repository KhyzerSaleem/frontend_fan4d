import { Link } from "@/i18n/routing";

interface WishlistButtonProps {
  productId: number;
}

const ViewButton = ({ productId }: WishlistButtonProps) => {


  return (
    <Link href={`/categories/all-products/${productId}`} className="p-[5px] rounded-sm bg-light-hover flex items-center justify-center">
    <img src="/assets/icons/eye.svg" alt="icon" />
  </Link>
  );
};

export default ViewButton;