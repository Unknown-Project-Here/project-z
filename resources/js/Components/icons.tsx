import { GlobeIcon, MailIcon } from 'lucide-react';

export const Icons = {
    mail: MailIcon,
    globe: GlobeIcon,
    github: ({ ...props }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C20.565 21.795 24 17.295 24 12C24 5.37 18.63 0 12 0Z"
                fill="currentColor"
            />
        </svg>
    ),
    discord: ({ ...props }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M20.317 4.15575C18.7873 3.45374 17.147 2.93673 15.4319 2.64073C15.4007 2.63474 15.3695 2.64873 15.3534 2.67757C15.1424 3.05357 14.9087 3.54257 14.7451 3.92757C12.9004 3.65057 11.0652 3.65057 9.25832 3.92757C9.09465 3.53373 8.85248 3.05357 8.64057 2.67757C8.62448 2.64973 8.59327 2.63574 8.56206 2.64073C6.84791 2.93573 5.20756 3.45274 3.67694 4.15575C3.66368 4.16174 3.65233 4.17073 3.64479 4.18273C0.533392 8.83173 -0.31895 13.3659 0.099181 17.8435C0.101072 17.8655 0.11337 17.8865 0.130398 17.8995C2.18321 19.4075 4.17171 20.3225 6.12324 20.9295C6.15445 20.9385 6.18757 20.9275 6.20748 20.9015C6.66913 20.2715 7.08073 19.6065 7.43348 18.9075C7.45432 18.8665 7.43442 18.818 7.39179 18.8015C6.73929 18.554 6.12607 18.252 5.53978 17.909C5.49241 17.8815 5.48866 17.814 5.53228 17.7815C5.65799 17.6875 5.78379 17.5895 5.90394 17.4905C5.92575 17.472 5.95601 17.468 5.98153 17.4795C9.88928 19.273 14.1415 19.273 18.023 17.4795C18.0485 17.467 18.0788 17.471 18.1015 17.4895C18.2217 17.5885 18.3475 17.6875 18.4741 17.7815C18.5177 17.814 18.5149 17.8815 18.4675 17.909C17.8812 18.259 17.2679 18.554 16.6145 18.8005C16.5719 18.817 16.553 18.8665 16.5738 18.9075C16.9341 19.6055 17.3457 20.2705 17.7989 20.9005C17.8179 20.9275 17.8519 20.9385 17.8831 20.9295C19.8438 20.3225 21.8323 19.4075 23.8851 17.8995C23.9031 17.8865 23.9144 17.8665 23.9163 17.8445C24.4154 12.6695 23.1358 8.17673 20.3482 4.18373C20.3416 4.17073 20.3303 4.16174 20.317 4.15575ZM8.02003 15.117C6.8375 15.117 5.86313 14.0315 5.86313 12.698C5.86313 11.3645 6.81862 10.279 8.02003 10.279C9.23087 10.279 10.1958 11.374 10.1769 12.698C10.1769 14.0315 9.22141 15.117 8.02003 15.117ZM15.9947 15.117C14.8123 15.117 13.8379 14.0315 13.8379 12.698C13.8379 11.3645 14.7934 10.279 15.9947 10.279C17.2056 10.279 18.1705 11.374 18.1516 12.698C18.1516 14.0315 17.2056 15.117 15.9947 15.117Z"
                fill="currentColor"
            />
        </svg>
    ),
};
