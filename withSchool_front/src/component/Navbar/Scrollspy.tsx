import React, { Component } from 'react';

interface ScrollSpyProps {
    scrollTargetIds: string[];
    activeNavClass: string;
    scrollDuration: number;
    headerBackground: string;
    router?: string;
    className?: string;
    children?: React.ReactNode;
}

class ScrollSpy extends Component<ScrollSpyProps> {
    scrollTargetIds: string[];
    activeNavClass: string;
    scrollDuration: number;
    headerBackground: boolean;
    homeDefaultLink: string;
    hashIdentifier: string;

    constructor(props: ScrollSpyProps) {
        super(props);

        this.scrollTargetIds = this.props.scrollTargetIds;
        this.activeNavClass = this.props.activeNavClass;
        this.scrollDuration = Number(this.props.scrollDuration) || 1000;
        this.headerBackground = this.props.headerBackground === "true";

        if (this.props.router && this.props.router === "HashRouter") {
            this.homeDefaultLink = "#/";
            this.hashIdentifier = "#/#";
        } else {
            this.homeDefaultLink = "/";
            this.hashIdentifier = "#";
        }
        this.scrollSection = this.scrollSection.bind(this);
    }

    easeInOutQuad(current_time: number, start: number, change: number, duration: number): number {
        current_time /= duration / 2;
        if (current_time < 1) return change / 2 * current_time * current_time + start;
        current_time--;
        return -change / 2 * (current_time * (current_time - 2) - 1) + start;
    }

    scrollTo(start: number, to: number, duration: number) {
        let change = to - start,
            currentTime = 0,
            increment = 10;

        const animateScroll = () => {
            currentTime += increment;
            let val = this.easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    getNavLinkElement(sectionID: string): HTMLElement | null {
        return document.querySelector(`a[href='${this.hashIdentifier}${sectionID}']`);
    }

    getNavToSectionID(navHref: string): string {
        return navHref.includes(this.hashIdentifier) ? navHref.replace(this.hashIdentifier, "") : "";
    }

    componentDidMount() {
        const homeLink = document.querySelector(`a[href='${this.homeDefaultLink}']`);
        if (homeLink) {
            homeLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.scrollTo(window.pageYOffset, 0, this.scrollDuration);
                window.location.hash = "";
            });
        }

        document.querySelectorAll("div[data-nav='list'] a").forEach((navLink) => {
            navLink.addEventListener("click", (event) => {
                event.preventDefault();
                let sectionID = this.getNavToSectionID(navLink.getAttribute("href") || "");

                if (sectionID) {
                    let scrollTargetPosition = document.getElementById(sectionID)?.offsetTop || 0 - (this.headerBackground ? document.querySelector("div[data-nav='list']")?.scrollHeight || 0 : 0);
                    this.scrollTo(window.pageYOffset, scrollTargetPosition, this.scrollDuration);
                } else {
                    this.scrollTo(window.pageYOffset, 0, this.scrollDuration);
                }
            });
        });

        window.addEventListener("scroll", this.scrollSection, true);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollSection, true);
    }

    scrollSection = () => {
        let scrollSectionOffsetTop;
        this.scrollTargetIds.forEach((sectionID, index) => {
            const sectionElement = document.getElementById(sectionID);
            if (sectionElement) {
                scrollSectionOffsetTop = sectionElement.offsetTop - (this.headerBackground ? document.querySelector("div[data-nav='list']")?.scrollHeight || 0 : 0);

                if (window.pageYOffset >= scrollSectionOffsetTop && window.pageYOffset < scrollSectionOffsetTop + sectionElement.scrollHeight) {
                    this.getNavLinkElement(sectionID)?.classList.add(this.activeNavClass);
                    (this.getNavLinkElement(sectionID)?.parentNode as HTMLElement)?.classList.add(this.activeNavClass);
                    this.clearOtherNavLinkActiveStyle(sectionID);
                } else {
                    this.getNavLinkElement(sectionID)?.classList.remove(this.activeNavClass);
                    (this.getNavLinkElement(sectionID)?.parentNode as HTMLElement)?.classList.remove(this.activeNavClass);
                }

                if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight && index === this.scrollTargetIds.length - 1) {
                    this.getNavLinkElement(sectionID)?.classList.add(this.activeNavClass);
                    (this.getNavLinkElement(sectionID)?.parentNode as HTMLElement)?.classList.add(this.activeNavClass);
                    this.clearOtherNavLinkActiveStyle(sectionID);
                }
            }
        });
    }

    clearOtherNavLinkActiveStyle(excludeSectionID: string) {
        this.scrollTargetIds.forEach((sectionID) => {
            if (sectionID !== excludeSectionID) {
                this.getNavLinkElement(sectionID)?.classList.remove(this.activeNavClass);
                (this.getNavLinkElement(sectionID)?.parentNode as HTMLElement)?.classList.remove(this.activeNavClass);
            }

        });
    }

    render() {
        return (
            <div data-nav="list" className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default ScrollSpy;