import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import { useHistory } from "react-router-dom";
import MainLayout from "./Layout/Layout";
import LoadingSpinner from "./LoadingSpinner";
import { UpOutlined, DownOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Card, Carousel, Statistic } from "antd";

function StateDetails() {
    const stateId = window.location.pathname.split("/")[2];
    const history = useHistory();
    const [state, setState] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [cities, setCities] = useState<any>([]);
    const [selectedId, setSelectedId] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        Promise.all([
            ApiService.get(ApiUrls.states, { id: stateId })
        ])
            .then(([data]) => {
                if (!data.error) {
                    setState(data.state[0])
                    setCities(data.cites)
                }
            })

            .catch(error => {
                console.log("Something went wrong!!!");
            })
            .finally(() => setLoading(false))
    }, [])

    return <MainLayout>
        {
            loading ?
                <LoadingSpinner /> :
                <div style={{ paddingTop: "20px" }}>
                    <div style={{ textAlign: "center" }}>
                        <img src={window.location.origin + "/state/" + state?.["State.png"]} height={"500px"} width={"500px"} />
                    </div>
                    <div
                        style={{
                            fontSize: "50px",
                            fontWeight: "600",
                            padding: "5px 0 0 5px",
                            marginBottom: "20px",
                            textAlign: "center",
                        }}
                    >
                        {state?.State} ({state?.Languages})
                    </div>
                    <div style={{ fontSize: "20px", textAlign: "center" }}>
                        <b>Population</b> - {state?.Population}
                        <br />
                        <b>Capital</b> - {state?.Capital}
                    </div>

                    {
                        cities?.length !== 0 ? <>
                            <div
                                style={{
                                    fontSize: "50px",
                                    fontWeight: "600",
                                    padding: "5px 0 0 5px",
                                    marginBottom: "20px",
                                    textAlign: "center",
                                    textDecoration: "underline"
                                }}
                            >
                                Cities
                            </div>

                            {
                                cities.map((city: any) => {
                                    return <>
                                        <div style={{ border: "1px solid grey", padding: "5px", paddingLeft: "10px", cursor: "pointer", fontSize: "30px" }}>
                                            <b>{city?.City} ({city?.Temperature}{'\u00B0'}C) - {city?.Description}
                                            </b>
                                            {
                                                selectedId === city?.["City Id"] ?
                                                    <UpOutlined style={{ float: "right", position: "relative", top: 8, paddingRight: "10px", userSelect: "none" }}
                                                        onClick={() => {
                                                            setSelectedId("")
                                                        }}
                                                    /> :
                                                    <DownOutlined style={{ float: "right", position: "relative", top: 8, paddingRight: "10px", userSelect: "none" }}
                                                        onClick={() => {
                                                            setSelectedId(city?.["City Id"])
                                                        }}
                                                    />
                                            }

                                            <a style={{ float: "right", marginRight: "20px" }} onClick={() => history.push(`/city/${city?.["City Id"]}/hotels`)}>View hotels</a>

                                        </div>

                                        {
                                            selectedId === city?.["City Id"] && <>
                                                <br />
                                                <div
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "50% 50%",
                                                        gridRowGap: "15px", textAlign: "center", textDecoration: "underline"
                                                    }}
                                                >
                                                    {
                                                        city?.["Places"]?.map((place: any) => {
                                                            const images: any = place?.images?.slice(1, place?.images?.length - 1).replace(/\s+/g, '').replace(/'/g, '').split(",");
                                                            console.log(images)
                                                            return <>
                                                                <Card key={place?.Id_Place} style={{ border: '1px solid #d7d7dc', width: '650px', boxShadow: "2px 2px 3px 3px lightgrey" }}>
                                                                    <Statistic key={place?.Id_Place}
                                                                        title={<div style={{ fontWeight: "600", color: "#1890ff", fontSize: "30px" }}>{place?.Place} <a href={place?.Map} target="_blank"><EnvironmentOutlined /></a>
                                                                            <div style={{ height: "520px" }}>
                                                                                <Carousel dotPosition="right" style={{ width: "500px", height: "300px", display: "inline-block", paddingTop: "20px", paddingBottom: "20px" }}>
                                                                                    {
                                                                                        images[0]?.length !== 0 ? images?.map((key: any) => {
                                                                                            return <div style={{ height: "500px", width: "500px" }}>
                                                                                                <img src={window.location.origin + `/` + key} width={"500px"} height={"500px"} />
                                                                                            </div>
                                                                                        }) : <img src={window.location.origin + `/traveling.jpg`} width={"500px"} height={"500px"} />
                                                                                    }
                                                                                </Carousel>
                                                                            </div>
                                                                        </div>
                                                                        } value={`Best time`}
                                                                    />
                                                                    <img src={`${window.location.origin}/${place?.["Best"] === "Winter" ? "Winter.png" : "Summer.png"}`} />
                                                                </Card>
                                                            </>
                                                        })
                                                    }
                                                </div>
                                            </>
                                        }
                                        <br />
                                    </>
                                })
                            }
                        </> :
                            <div
                                style={{
                                    fontSize: "50px",
                                    fontWeight: "600",
                                    padding: "5px 0 0 5px",
                                    marginBottom: "20px",
                                    textAlign: "center"
                                }}
                            >
                                No cities
                            </div>
                    }
                </div>
        }
    </MainLayout >
}

export default StateDetails;
