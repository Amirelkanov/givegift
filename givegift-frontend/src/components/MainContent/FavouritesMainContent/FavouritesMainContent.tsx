import { ResultsError } from "../../../pages/Error/ResultsError/ResultsError";
import type { IFavProduct } from "../../../types";
import ProductsList from "../../ProductsList/ProductsList";
import { ProductsLoader } from "../../UI/Loader/ProductsLoader/ProductsLoader";

interface FavouritesMainContentProps {
    isUserFavouritesLoading: boolean;
    userFavouritesError: string;
    userFavourites: IFavProduct[];
}

export const FavouritesMainContent: React.FC<FavouritesMainContentProps> = ({
    isUserFavouritesLoading,
    userFavouritesError,
    userFavourites,
}) => {
    let pageContent;

    if (isUserFavouritesLoading) {
        pageContent = <ProductsLoader loadingText={"Ищем избранное..."} />;
    } else if (userFavouritesError) {
        pageContent = <ResultsError errorMsg={userFavouritesError} />;
    } else {
        pageContent = <ProductsList products={userFavourites} />;
    }

    return pageContent;
};