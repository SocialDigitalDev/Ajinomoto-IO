import { useEffect } from "react";

import './global.css';

const HighlightInstitutionalMenu = () => {

    useEffect(()=>{

        let urlPath:any = window.location.pathname;
        let urlLinkArray:any = document.querySelectorAll('.vtex-menu-2-x-styledLink--menu-institucional');

        for (var i = 0; i <= urlLinkArray.length; i++){
            var urlLink = urlLinkArray[i]?.getAttribute('href');
            if (urlLink === urlPath){
                var urlLinkContent = urlLinkArray[i].querySelector('.vtex-menu-2-x-styledLinkContent--menu-institucional');
                urlLinkContent?.classList.add('active')
            }
        }

    },[])

    return null;

}

export default HighlightInstitutionalMenu;