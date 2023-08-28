import React, { useEffect, useState } from "react";
import * as S from "./MainStyled";
import breakfastIcon from "../../asset/breakfastIcon.svg"
import lunchIcon from "../../asset/lunchIcon.svg"
import dinnerIcon from "../../asset/dinnerIcon.svg"
import ArrowIcon from "../../asset/Arrow.svg"
import API from "../../utils/API";
import moment from "moment";
import axios from "axios";

type d = {
    year : string;
    month : string;
    day : string;
}

type serverData = {
    date : string;
    breakfast : string;
    lunch : string;
    dinner : string;
}


const Main = () => {
    const [requestDate,setRequestDate] = useState<d>({
        year : moment().format("YYYY"),
        month : moment().format("MM"),
        day : moment().format("DD")
    })
    const [serverData, setServerData] = useState<serverData>({
        date : "",
        breakfast : "",
        lunch : "",
        dinner : ""
    })

    axios.get('http://43.201.27.119:8080/menu?year=2023&month=06&day=21')
    .then((res)=>{
        console.log(res)
    }) 
    

    useEffect(()=>{
        // 서버 고치는 중
        API.get(`/menu?year=${requestDate.year}&month=${requestDate.month}&day=${requestDate.day}`)
        .then((res)=>{
            console.log(res)
            const {date , breakfast, lunch, dinner} = res.data
            setServerData({date, breakfast, lunch, dinner})
        })
    },[])

    return (
        <>
            <S.Wrapper>

                <S.Arrow src={ArrowIcon} direction="left" ></S.Arrow>

                <S.ContentWrapper>
                    <S.DateDiv>2023년 05월 23일 (화)</S.DateDiv>

                    <S.MealComponent color="#FFAF51">
                        <S.MealIcon src={breakfastIcon} />

                        <div>
                            <S.MealInfo>
                                <S.WhenMeal color="#FFAF51">조식</S.WhenMeal>
                                <S.Kcal>1004 Kcal</S.Kcal>
                            </S.MealInfo>
                            
                            <S.MealContent>쇠고기버섯죽,채소샐러드/유자드레싱,*치즈함박스테이크,배추김치,코코볼시리얼+우유</S.MealContent>
                        </div>

                    </S.MealComponent>

                    <S.MealComponent color="#ABC97B">
                        <S.MealIcon src={lunchIcon} />

                        <div>
                            <S.MealInfo>
                                <S.WhenMeal color="#ABC97B">중식</S.WhenMeal>
                                <S.Kcal>1004 Kcal</S.Kcal>
                            </S.MealInfo>
                            
                            <S.MealContent>*흑미밥,*사각동태국,오이생채,*깐쇼새우,#연탄대패불고기,배추김치</S.MealContent>
                        </div>
                        

                    </S.MealComponent>

                    <S.MealComponent color="#CF75CC">
                        <S.MealIcon src={dinnerIcon} />
                        <div>
                            <S.MealInfo>
                                <S.WhenMeal color="#CF75CC">석식</S.WhenMeal>
                                <S.Kcal>1004 Kcal</S.Kcal>
                            </S.MealInfo>
                            
                            <S.MealContent>*추가밥,잔치국수/양념장,골뱅이채소무침,*후라이드치킨+맵스터소스,배추김치,*치킨무</S.MealContent>
                        </div>

                    </S.MealComponent>
                </S.ContentWrapper>

                <S.Arrow src={ArrowIcon} direction="right" ></S.Arrow>

            </S.Wrapper>
        </>
    )
}

export default Main;