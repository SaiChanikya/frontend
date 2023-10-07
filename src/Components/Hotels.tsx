import { useEffect, useState } from "react";
import ApiService from "../Api.Service";
import ApiUrls from "../ApiUrls";
import MainLayout from "./Layout/Layout";
import LoadingSpinner from "./LoadingSpinner";
import { Card, Carousel, Rate, Statistic } from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";

function Hotels() {
    const [hotels, setHotels] = useState<any>([])
    const cityId = window.location.pathname.split("/")[2];
    const [loading, setLoading] = useState<boolean>(false);
    const [cityName, setCityName] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        Promise.all([
            ApiService.get(ApiUrls.hotels, { cityId: cityId }),
            ApiService.get(ApiUrls.cities, { id: cityId })
        ])
            .then(([data, [cityData]]) => {
                if (!data.error) {
                    setHotels(data);
                }

                if (!cityData.error) {
                    setCityName(cityData?.City);
                }
            })
            .catch(() => console.log(`something went wrong`))
            .finally(() => setLoading(false))
    }, [])

    return <MainLayout>
        {
            loading ? <LoadingSpinner /> : hotels?.length !== 0 ? <>
                <div className="content-header">
                    Hotels in {cityName}
                </div>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "50% 50%",
                        gridRowGap: "15px"
                    }}
                >
                    {
                        hotels.map((hotel: any) => {
                            const images: any = hotel?.images?.slice(1, hotel?.images?.length - 1).replace(/\s+/g, '').replace(/'/g, '').split(",");
                            return <>
                                <Card key={hotel?.["City Id"]} style={{ border: '1px solid #d7d7dc', width: '650px', boxShadow: "2px 2px 3px 3px lightgrey", textAlign: "center" }}>
                                    <div style={{ fontWeight: "600", fontSize: "30px", color: "#1890ff" }}>{hotel?.Name} <a href={hotel?.Map} target="_blank"><EnvironmentOutlined /></a></div>
                                    <Carousel dotPosition="right" style={{ width: "500px", height: "300px", display: "inline-block", paddingTop: "20px", paddingBottom: "20px" }}>
                                        {
                                            images?.map((key: any) => {
                                                return <div style={{ height: "500px", width: "500px" }}>
                                                    <img src={window.location.origin + `/` + key} width={"500px"} height={"500px"} />
                                                </div>
                                            })
                                        }
                                    </Carousel>

                                    <div style={{ fontSize: "30px" }}>
                                        {hotel?.Restaurant === "Yes" && <img src={`${window.location.origin}/restaurant.png`} width={25} />}&nbsp;
                                        <img src={`${window.location.origin}/${hotel?.Ac === "Yes" ? "ac.png" : "nonac.png"}`} width={25} />&nbsp;
                                        <a href={`tel:${hotel?.["Phone Number"]}`}><PhoneOutlined style={{ fontSize: "20px" }} /></a>
                                    </div>

                                    <div style={{ textAlign: 'right', fontSize: "20px" }}>
                                        <Rate value={hotel?.Rating} disabled />
                                    </div>
                                </Card>
                            </>
                        })
                    }
                </div>
            </> : <div className="content-header">
                No hotels in {cityName}
            </div>
        }

    </MainLayout >
}

export default Hotels;
