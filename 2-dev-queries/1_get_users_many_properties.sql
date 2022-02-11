select email, count(properties)
from users
join properties on owner_id = users.id
group by email
order by count(properties) desc
;