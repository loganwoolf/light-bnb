select email, count(properties), count(reservations)
from users
join properties on owner_id = users.id
join reservations on guest_id = users.id
group by email
-- order by count(reservations) desc
;
--DOES NOT WORK ^^^


--jaycewilliamson@outlook.com