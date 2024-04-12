import './Navbar.scss';
import {
  AnnouncementBar,
  CollapsableTree,
  Menubar,
  Searchbar,
  Drawer,
  CustomSlider,
} from '..';
import { Link } from 'react-router-dom';
import {
  ChevronUp,
  Heart,
  Menu,
  RefreshCw,
  ShoppingCart,
  User,
} from 'lucide-react';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { CollapseList } from '../CollapsableTree/CollapsableTree';
import logo from '../../assets/images/logo.webp';
import CartDrawer from '../CartDrawer/CartDrawer';
import { Loading, formatCurrency } from '../../utils';
import useCart from '../../hooks/useCart';
import useScrollDirection from '../../hooks/useScrollDirection';
const cameraList = [
  {
    heading: 'Airpods1',
    items: ['Cameras & Videos', "Camera's", 'Headphones', 'Ipads'],
  },
  {
    heading: 'Airpods2',
    items: ['Cameras & Videos', "Camera's", 'Headphones', 'Ipads'],
  },
  {
    heading: 'Airpods3',
    items: ['Cameras & Videos', "Camera's", 'Headphones', 'Ipads'],
  },
  {
    heading: 'Airpods4',
    items: ['Cameras & Videos', "Camera's", 'Headphones', 'Ipads'],
  },
];
const MENU_LINKS: CollapseList = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Cameras & Videos',
    url: '/store/cameras',
    children: (
      <div className="menu-content-wrapper">
        {cameraList.map(({ heading, items }) => (
          <div key={heading}>
            <h3 className="title">{heading}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Computers & Laptops',
    url: '/store/computers',
    children: (
      <CustomSlider displayCount={2}>
        <div
          style={{
            background: 'blue',
            textAlign: 'center',
          }}
        >
          img1
        </div>
        <div
          style={{
            background: 'blue',
            textAlign: 'center',
          }}
        >
          img2
        </div>
        <div
          style={{
            background: 'blue',
            textAlign: 'center',
          }}
        >
          img3
        </div>
        <div
          style={{
            background: 'blue',
            textAlign: 'center',
          }}
        >
          img4
        </div>
      </CustomSlider>
    ),
  },
  {
    title: 'Home Appliance',
    url: '/store/appliance',
    children: (
      <div className="menu-content-wrapper">
        {cameraList.map(({ heading, items }) => (
          <div key={heading}>
            <h4 className="title">{heading}</h4>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Handbag',
    url: '/store/handbag',
  },
  {
    title: 'Mobiles & Tablets',
    url: '/store/mobiles',
  },
  {
    title: 'Smart Phones',
    url: '/store/phones',
  },
  {
    title: 'Portable Speakers',
    url: '/store/speakers',
  },
  {
    title: 'gaming',
    url: '/store/gaming',
    children: [{ title: 't' }, { title: 't' }],
  },
  {
    title: 'Our Store',
    url: '/store',
  },
  {
    title: 'Blogs',
    url: '/blogs',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];
function Navbar() {
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const [isToTopBtnVisible, setIsToTOpBtnVisible] = useState(false);
  const { totalCartProductsPrice, totalCartProductsCount, isFetching, error } =
    useCart();
  const loginElementRef = useRef<ElementRef<'div'>>(null);
  const intElementRef = useRef<ElementRef<'div'>>(null);
  const scrollDir = useScrollDirection();
  useEffect(() => {
    const clickHandler = (ev: globalThis.MouseEvent) => {
      console.log(ev);
      if (!loginElementRef.current) return;
      if (
        !loginElementRef.current.contains(ev.target as Node) &&
        isLoginMenuOpen
      ) {
        console.log('close menu');
        setIsLoginMenuOpen(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [isLoginMenuOpen]);
  useEffect(() => {
    if (!intElementRef.current) return;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      setIsToTOpBtnVisible(!entries[0].isIntersecting);
    };
    const intObs = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px',
    });
    intObs.observe(intElementRef.current);
    return () => {
      intObs.disconnect();
    };
  }, []);
  function toggleLoginMenu() {
    setIsLoginMenuOpen((p) => !p);
  }
  function closeCartMenu() {
    setIsCartMenuOpen(false);
  }
  function openCartMenu() {
    setIsCartMenuOpen(true);
  }
  function closeMobileMenu() {
    setisMobileMenuOpen(false);
  }
  function openMobileMenu() {
    setisMobileMenuOpen(true);
  }
  function moveToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <>
      <div ref={intElementRef} />
      <AnnouncementBar />
      <div
        style={
          scrollDir === 'up'
            ? {
                position: 'sticky',
                top: '0',
                zIndex: '10000',
              }
            : undefined
        }
      >
        <header className="navbar">
          <div className="container">
            <div className="navbar__content">
              <div className="navbar__left-wrapper">
                <div className="navbar__logo-wrapper">
                  <button
                    className="navbar__mobile-menu-btn"
                    onClick={() => openMobileMenu()}
                  >
                    <Menu size={30} />
                  </button>
                  <Link to="/" className="navbar__logo-link">
                    <img src={logo} alt="logo" className="navbar__logo" />
                  </Link>
                </div>

                <div className="navbar__search-form-wrapper">
                  <Searchbar />
                </div>
              </div>
              <div className="navbar__right-wrapper">
                <ul className="navbar__actions-list">
                  <li className="navbar__actions-list__item">
                    <Link to="/compare" className="navbar__action-link">
                      <RefreshCw className="navbar__action-icon" />
                      <div className="navbar__action-text-content">
                        Compare
                        <br />
                        Products
                      </div>
                    </Link>
                  </li>
                  <li className="navbar__actions-list__item">
                    <Link to="/wishlist" className="navbar__action-link">
                      <Heart className="navbar__action-icon" />
                      <div className="navbar__action-text-content">
                        Favourite
                        <br />
                        Wishlist
                      </div>
                    </Link>
                  </li>
                  <li className="navbar__actions-list__item">
                    {/* FIXME: Fix All Drop down menus 'navbar/announcment */}
                    {/* TODO: if registered go to avatar if not go to login page */}
                    <button
                      className="navbar__action-btn navbar__login-btn"
                      onClick={() => toggleLoginMenu()}
                    >
                      <User className="navbar__action-icon" />
                      <div className="navbar__action-text-content">
                        Log in
                        <br />
                        My Account
                      </div>
                    </button>
                    <ul
                      className={`navbar__login-options-list  ${
                        isLoginMenuOpen ? 'show' : ''
                      }`}
                    >
                      <li className="navbar__login-options-list__item">
                        <Link
                          to="/login"
                          className="navbar__login-options-list__item__link"
                        >
                          Log In
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          to="/register"
                          className="navbar__login-options-list__item__link"
                        >
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="navbar__actions-list__item">
                    <button
                      className="navbar__action-btn navbar__cart-btn"
                      onClick={() => openCartMenu()}
                    >
                      <ShoppingCart className="navbar__action-icon" />
                      <div className="navbar__action-text-content navbar__cart-btn__content">
                        <span className="navbar__cart-quantity">
                          {totalCartProductsCount}
                        </span>
                        <div className="navbar__cart-total-price">
                          <Loading
                            isFetching={isFetching}
                            error={error}
                            renderLoader={<span>Loading</span>}
                          >
                            {formatCurrency(totalCartProductsPrice)}
                          </Loading>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <Menubar />
      </div>
      <Drawer
        direction="left"
        open={isMobileMenuOpen}
        onClose={() => closeMobileMenu()}
        className="navbar__mobile-menu-drawer"
      >
        <CollapsableTree collapseList={MENU_LINKS} />
      </Drawer>
      <CartDrawer
        closeCartMenu={closeCartMenu}
        isCartMenuOpen={isCartMenuOpen}
      />
      <button
        className={`to-top-btn ${isToTopBtnVisible ? 'show' : ''}`}
        onClick={() => moveToTop()}
      >
        <ChevronUp />
      </button>
    </>
  );
}

export default Navbar;
