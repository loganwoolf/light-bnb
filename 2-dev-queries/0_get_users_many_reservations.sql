select email, count(reservations)
from users
join reservations on guest_id = users.id
group by email
order by count(reservations) desc
;

--clairehayden@ymail.com
--brodyboone@mail.com