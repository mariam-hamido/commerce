import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";



export let WishlistContext =createContext();

export default function WishlistProvider({children}){
    const endPoint=`https://ecommerce.routemisr.com/api/v1/cart`;

    const headers={
        token: accessToken,
    }

    const [wishlist,setWishlist]=useState([])

    const {accessToken}=  useContext(UserContext);
    const [numOfCartItems, setNumOfCartItems] = useState()
    const [cartId, setcartId] = useState()
    const [userId, setUserId] = useState()
    const [cartDetails, setCartDetails] = useState(null)
    async function addToWishlist(productId) {
        try {
        const{data}= await   axios.post(endPoint,{productId},{headers})
        setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data.data)
    setcartId(data.data._id)
    setUserId(data.data.cartOwner)
        console.log(data)
        if(data.status==="success"){
            toast.success(data.message)
        }
        return data;
        } catch (error) {
            console.log(error);
            return error.response.data.message;
        }
    }
    
    async function removeFromWishlist(productId) {
        try{
            const {data} = await axios.delete(`${endPoint}/${productId}`,{headers})
           
            return data
        } catch (error) {
            console.log(error)
            return error.response.data.message
        }
    }



    return(
        <WishlistContext.Provider value={{wishlist,setWishlist,addToWishlist,removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

