import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Storiescard from "../ui/Storiescard";

import left from "../../../assets/web/icons/left-arrow.png"
import right from "../../../assets/web/icons/right-arrow.png"

import s1 from "../../../assets/web/s1.png"
import s2 from "../../../assets/web/s2.png"
import s3 from "../../../assets/web/s3.png"

const storiesData = [
    {
        image: s1,
        say: "Lorem ipsum dolor sit amet consectetur. Vel cursus quam vulputate mi. Elementum lobortis tempus fames blandit. Nibh hac nisi urna bibendum erat felis. Risus ultricies a mattis pretium. Quisque vitae lorem suspendisse amet."
    },
    {
        image: s2,
        say: "Lorem ipsum dolor sit amet consectetur. Vel cursus quam vulputate mi. Elementum lobortis tempus fames blandit. Nibh hac nisi urna bibendum erat felis. Risus ultricies a mattis pretium. Quisque vitae lorem suspendisse amet."
    },
    {
        image: s3,
        say: "Lorem ipsum dolor sit amet consectetur. Vel cursus quam vulputate mi. Elementum lobortis tempus fames blandit. Nibh hac nisi urna bibendum erat felis. Risus ultricies a mattis pretium. Quisque vitae lorem suspendisse amet."
    },
]

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className=" absolute top-[50%] right-[0px] sm:right-[-40px] cursor-pointer px-1 z-[20]"
            onClick={onClick}
        ><img src={right} className=" max-w-[24px] md:max-w-[40px] w-full" /></div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className=" absolute top-[50%] left-[0px] sm:left-[-40px] cursor-pointer px-1 z-[20]"
            onClick={onClick}
        ><img src={left} className=" max-w-[24px] md:max-w-[40px] w-full" /></div>
    );
}

function index() {

    var settings = {
        infinite: true,
        autoplay: false,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            }
        ],
    };

    return (
        <div className="slider-container !max-w-[360px] sm:!max-w-[360px] md:!max-w-[700px] lg:!max-w-[1000px] xl:!max-w-[1180px]">
            <Slider {...settings}>
                {storiesData && storiesData?.map((story, index) => (
                    <div key={index}>
                        <Storiescard key={index} image={story.image} say={story.say} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default index;