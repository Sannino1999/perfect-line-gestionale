# Domain model

Member = person/anagraphic record.

MembershipPlan = reusable commercial offer configured by a tenant.

Membership = a specific purchase/activation of a plan for a member, with start/end dates and a frozen price.

Payment = financial movement linked to a member and optionally to a membership.

The membership price is copied at activation so later plan-price changes do not rewrite historical purchases.