insert into tasks (name, priority, due_date) values
('Christmas celebration', 'H', '2020-12-23'),
('New Year celebration', 'H', '2020-12-28'),
('Assessment preparation', 'M', '2020-12-16');

insert into todolist (task_id, todoname, status) values
(1, 'Order log cake', 0),
(2, 'House cleaning', 0),
(1, 'Buy wine', 1),
(1, 'Order turkey and ham', 1),
(1, 'Collect orders', 0),
(2, 'Invite guests', 1);

select * from tasks;
select * from todolist;

select t.name, t.priority, t.due_date, td.todoname, td.status from tasks t join todolist td using (task_id);
