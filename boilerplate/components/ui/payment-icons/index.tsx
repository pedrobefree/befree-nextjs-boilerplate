import type { SVGProps } from "react";
import { CreditCard } from "lucide-react";

export const PaymentIcon = ({ type: _type, ...props }: { type: string } & SVGProps<SVGSVGElement>) => {
    // These would normally be custom SVGs from Untitled UI
    // Using CreditCard as placeholder for now
    return <CreditCard {...props} />;
};

export const VisaIcon = (props: SVGProps<SVGSVGElement>) => <PaymentIcon type="visa" {...props} />;
export const MastercardIcon = (props: SVGProps<SVGSVGElement>) => <PaymentIcon type="mastercard" {...props} />;
export const AmexIcon = (props: SVGProps<SVGSVGElement>) => <PaymentIcon type="amex" {...props} />;
