import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import { useHistory } from "react-router-dom";
import { Card, Statistic } from "antd";
import LoadingSpinner from "./LoadingSpinner";
import MainLayout from "./Layout/Layout";

function States() {
    const [states, setStates] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        ApiService.get(ApiUrls.states)
            .then(data => setStates(data))
            .catch(() => console.log(`something went wrong`))
            .finally(() => setLoading(false))
    }, [])

    return <MainLayout>
        {
            states?.length !== 0 ? <>
                <div className='content-header'>
                    States
                </div>

                {
                    loading ?
                        <LoadingSpinner /> :
                        states?.map((state: any) => {
                            return <div key={state?.Id} style={{ display: "inline-block", paddingRight: "10px", paddingBottom: "10px", }}>
                                <Card onClick={() => history.push(`/states/${state?.Id}`)} key={state?.Id} style={{ border: '1px solid #d7d7dc', width: '400px', boxShadow: "2px 2px 3px 3px lightgrey" }}>
                                    <div style={{ color: "#1890ff", fontWeight: "600", fontSize: "30px" }}>{state?.State}</div>
                                </Card>
                            </div>
                        })
                }
            </> : <div className='content-header'>
                No states
            </div>
        }
    </MainLayout>
}

export default States;
