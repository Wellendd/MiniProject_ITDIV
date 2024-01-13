﻿using ITDIV.Models;
using Microsoft.EntityFrameworkCore;

namespace ITDIV.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}
