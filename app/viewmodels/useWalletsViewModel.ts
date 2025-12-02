import { useEffect, useState } from "react";
import { addWallet, getUserWallets, updateWallet } from "../models/walletsModel";

export const useWalletsViewModel = (userID?:string) =>{
    const [wallet, setWallet] = useState<any>(null);
    const fetchWallet = async ()=>{
        if(!userID) return;
        const data = await getUserWallets(userID);
        setWallet(data[0]);
    }

    const createWallet = async (wallet:any)=>{
        if(!userID) return;
        await addWallet(userID, wallet);
        fetchWallet();
    }

    const editWallet = async (data:any)=>{
        if(!userID) return;
        await updateWallet(wallet.id, data);
        fetchWallet();
    }

    useEffect(()=>{
        fetchWallet();
    }, [userID])
    return {wallet, fetchWallet, createWallet, editWallet}
}