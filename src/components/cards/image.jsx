import React from 'react'

// General
import img_21 from '../../resources/images/general/Q_21.png'
import img_55 from '../../resources/images/general/Q_55.png'
import img_70 from '../../resources/images/general/Q_70.png'
import img_130 from '../../resources/images/general/Q_130.png'
import img_176 from '../../resources/images/general/Q_176.png'
import img_181 from '../../resources/images/general/Q_181.png'
import img_187 from '../../resources/images/general/Q_187.png'
import img_209 from '../../resources/images/general/Q_209.png'
import img_216 from '../../resources/images/general/Q_216.png'
import img_226 from '../../resources/images/general/Q_226.png'
import img_235 from '../../resources/images/general/Q_235.png'

// Regional

//BB
import bb_img_1 from '../../resources/images/regional/BB/Q_1.png'
import bb_img_8 from '../../resources/images/regional/BB/Q_8.png'
//BE
import be_img_1 from '../../resources/images/regional/BE/Q_1.png'
import be_img_8 from '../../resources/images/regional/BE/Q_8.png'
//BW
import bw_img_1 from '../../resources/images/regional/BW/Q_1.png'
import bw_img_8 from '../../resources/images/regional/BW/Q_8.png'
//BY
import by_img_1 from '../../resources/images/regional/BY/Q_1.png'
import by_img_8 from '../../resources/images/regional/BY/Q_8.png'
//HB
import hb_img_1 from '../../resources/images/regional/HB/Q_1.png'
import hb_img_8 from '../../resources/images/regional/HB/Q_8.png'
//HE
import he_img_1 from '../../resources/images/regional/HE/Q_1.png'
import he_img_8 from '../../resources/images/regional/HE/Q_8.png'
//HH
import hh_img_1 from '../../resources/images/regional/HH/Q_1.png'
import hh_img_8 from '../../resources/images/regional/HH/Q_8.png'
//MV
import mv_img_1 from '../../resources/images/regional/MV/Q_1.png'
import mv_img_8 from '../../resources/images/regional/MV/Q_8.png'
//NI
import ni_img_1 from '../../resources/images/regional/NI/Q_1.png'
import ni_img_8 from '../../resources/images/regional/NI/Q_8.png'
//NW
import nw_img_1 from '../../resources/images/regional/NW/Q_1.png'
import nw_img_8 from '../../resources/images/regional/NW/Q_8.png'
//RP
import rp_img_1 from '../../resources/images/regional/RP/Q_1.png'
import rp_img_8 from '../../resources/images/regional/RP/Q_8.png'
//SH
import sh_img_1 from '../../resources/images/regional/SH/Q_1.png'
import sh_img_8 from '../../resources/images/regional/SH/Q_8.png'
//SL
import sl_img_1 from '../../resources/images/regional/SL/Q_1.png'
import sl_img_8 from '../../resources/images/regional/SL/Q_8.png'
//SN
import sn_img_1 from '../../resources/images/regional/SN/Q_1.png'
import sn_img_8 from '../../resources/images/regional/SN/Q_8.png'
//ST
import st_img_1 from '../../resources/images/regional/ST/Q_1.png'
import st_img_8 from '../../resources/images/regional/ST/Q_8.png'
//TH
import th_img_1 from '../../resources/images/regional/TH/Q_1.png'
import th_img_8 from '../../resources/images/regional/TH/Q_8.png'
import {isRegionalQuestion} from "../../Questions";


const generalImages = {
    21: img_21,
    55: img_55,
    70: img_70,
    130: img_130,
    176: img_176,
    181: img_181,
    187: img_187,
    209: img_209,
    216: img_216,
    226: img_226,
    235: img_235
};

const regionalImages = {
    BB: {1: bb_img_1, 8: bb_img_8},
    BE: {1: be_img_1, 8: be_img_8},
    BW: {1: bw_img_1, 8: bw_img_8},
    BY: {1: by_img_1, 8: by_img_8},
    HB: {1: hb_img_1, 8: hb_img_8},
    HE: {1: he_img_1, 8: he_img_8},
    HH: {1: hh_img_1, 8: hh_img_8},
    MV: {1: mv_img_1, 8: mv_img_8},
    NI: {1: ni_img_1, 8: ni_img_8},
    NW: {1: nw_img_1, 8: nw_img_8},
    RP: {1: rp_img_1, 8: rp_img_8},
    SH: {1: sh_img_1, 8: sh_img_8},
    SL: {1: sl_img_1, 8: sl_img_8},
    SN: {1: sn_img_1, 8: sn_img_8},
    ST: {1: st_img_1, 8: st_img_8},
    TH: {1: th_img_1, 8: th_img_8}
};

export default function Image(props) {
    const question = props.question;
    if (!question || !question.hasImage) {
        return false;
    }

    const imgSrc = isRegionalQuestion(question) ?
        regionalImages[question.region][question.id] : generalImages[props.question.id];


    return (
        <div className="uk-card-media-top">
            <img src={imgSrc}
                 className="card__image uk-align-center"
                 alt={`Image for question ${question.id}`} 
            />
        </div>
    )
}