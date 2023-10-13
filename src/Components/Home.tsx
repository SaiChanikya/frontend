import { Card, Carousel, Input, Select, Statistic } from "antd";
import MainLayout from "./Layout/Layout";
import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const { Search } = Input;

function Home() {
    const [data, setData] = useState<any>();
    const [states, setStates] = useState<any>([]);
    const [top3States, setTop3States] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const contentStyle: any = {
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };

    useEffect(() => {
        setLoading(true)
        ApiService.get(ApiUrls.states)
            .then(data => {
                setStates(data)
                var threeStates: any = []
                for (let i = 0; i <= 2; i++) {
                    threeStates.push(data[i])
                }
                console.log(threeStates)
                setTop3States(threeStates)
            })
            .catch(() => console.log(`something went wrong`))
            .finally(() => setLoading(false))
    }, [])

    function updateFilter(value: string) {
        setData(states.filter((eachState: { State: string; }) => eachState?.State?.toLowerCase()?.includes(value?.toLowerCase())))
    }

    console.log(top3States);

    return <MainLayout>
        {
            loading ? <LoadingSpinner /> : <>
                <div style={{ fontWeight: 600, textAlign: "center", fontSize: 'medium', position: 'relative', top: '8px', padding: '0px 0px 30px 10px' }}>
                    <Select
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder={"Search by state name"}
                        style={{ width: "350px", fontSize: "20px" }}
                        showSearch
                        size="large"
                        onSearch={updateFilter}
                        onChange={(value) => {
                            history.push(`/states/${value}`)
                        }}
                        filterOption={(input, option) =>
                            //@ts-ignore
                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            states?.map((state: any) => {
                                return <Select.Option key={state['Id']} value={state['Id']}>
                                    {state['State']}
                                </Select.Option>
                            })
                        }
                    </Select>
                </div>

                <div style={{ paddingBottom: "20px", textAlign: "center", fontSize: "30px" }}>
                    <b>
                        We took an exciting and scary step. We decided to turn our travel blog from a hobby into our
                        full-time job. We would've had so much regret if we didn't take this opportunity
                    </b>
                </div>

                <Carousel autoplay style={{ width: "100%", margin: "auto" }}>
                    {
                        ['image1.jpeg', 'image2.jpg', 'image3.avif', 'image4.jpeg', 'image5.jpeg'].map(key => {
                            console.log(window.location.origin + "/" + key)
                            return <div style={{ height: "600px", width: "100%" }}>
                                <h3 style={contentStyle}>
                                    <img src={window.location.origin + "/" + key} width={"100%"} height={"600px"} />
                                </h3>
                            </div>
                        })
                    }
                </Carousel>

                <div style={{ "fontSize": "40px", fontWeight: "600" }}>
                    States
                </div>

                <div
                    style={{
                        display: "inline-block",
                        paddingRight: "10px",
                        paddingBottom: "10px"
                    }}
                >
                    {
                        top3States?.map((state: any) => {
                            return <div key={state?.Id}
                                style={{
                                    display: "inline-block",
                                    paddingRight: "10px"
                                }}
                            >
                                <Card onClick={() => history.push(`/states/${state?.Id}`)} key={state?.Id} style={{ border: '1px solid #d7d7dc', width: '350px', textAlign: "center", boxShadow: "2px 2px 3px 3px lightgrey" }}>
                                    <Statistic key={state?.Id}
                                        title={<div style={{ fontWeight: "600", color: "#1890ff", fontSize: "30px" }}>{state?.State}</div>} value={state?.Languages}
                                    />

                                    <img src={window.location.origin + "/state/" + state?.State + ".png"} height={"200px"} width={"300px"} />

                                    <div style={{ fontSize: "20px" }}><b>Capital</b> - {state?.Capital}</div>
                                </Card>
                            </div>
                        })
                    }

                    <div
                        style={{
                            display: "inline-block",
                            paddingRight: "10px",
                            paddingBottom: "10px"
                        }}
                    >
                        <Card style={{ width: '250px', height: "365px", position: "relative", bottom: 150, paddingTop: "50%", textAlign: "center", boxShadow: "2px 2px 3px 3px lightgrey" }}>
                            <a onClick={() => history.push("/states")} style={{ "fontSize": "30px" }}>View all</a>
                        </Card>
                    </div>
                </div>
            </>
        }
    </MainLayout>
}

export default Home;
